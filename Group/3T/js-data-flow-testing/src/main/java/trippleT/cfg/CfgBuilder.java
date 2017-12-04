package trippleT.cfg;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mozilla.javascript.Token;
import org.mozilla.javascript.ast.Assignment;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.Block;
import org.mozilla.javascript.ast.ExpressionStatement;
import org.mozilla.javascript.ast.ForLoop;
import org.mozilla.javascript.ast.FunctionNode;
import org.mozilla.javascript.ast.IfStatement;
import org.mozilla.javascript.ast.InfixExpression;
import org.mozilla.javascript.ast.Name;
import org.mozilla.javascript.ast.NumberLiteral;
import org.mozilla.javascript.ast.ReturnStatement;
import org.mozilla.javascript.ast.Scope;
import org.mozilla.javascript.ast.UnaryExpression;
import org.mozilla.javascript.ast.VariableDeclaration;
import org.mozilla.javascript.ast.VariableInitializer;

public class CfgBuilder {
	private int index;
	private DefUseStore defUseStore;
	private Map<Integer, CfgNode> nodeMap;
	private List<String> params;
	
	public Cfg buildCfg(FunctionNode function) {
		AstNode body = function.getBody();
		index = 0;
		nodeMap = new HashMap<Integer, CfgNode>();
		defUseStore = new DefUseStore();
		List<String> params = getParams(function);
		SubCfg subCfg = buildSubCfg(body);
		Cfg cfg = new Cfg(subCfg, nodeMap, params);
		return cfg;
	}
	
	public List<String> getParams(FunctionNode function) {
		List<AstNode> paramsNode = function.getParams();
		List<String> params = new ArrayList<String>();
		for (AstNode node: paramsNode) {
			params.add(node.toSource());
		}
		
		return params;
	}
	
	public SubCfg buildSubCfg(AstNode node) {
		if (node instanceof VariableDeclaration) {
			return buildVariableDeclarationSubCfg((VariableDeclaration) node);
		} else if (node instanceof VariableInitializer) {
			return buildVariableInitializerSubCfg((VariableInitializer) node);
		} else if (node instanceof ExpressionStatement) {
			return buildExpressionSubCfg((ExpressionStatement) node);
		} else if (node instanceof Block) {
			return buildBlockSubCfg((Block) node);
		} else if (node instanceof IfStatement) {
			return buildIfSubCfg((IfStatement) node);
		} else if (node instanceof ForLoop) {
			return buildForLoopSubCfg((ForLoop) node);
		} else if (node instanceof Scope) {
			return buildScopeSubCfg((Scope) node);
		} else if (node instanceof ReturnStatement) {
			return buildReturnSubCfg((ReturnStatement) node);
		} else if (node instanceof UnaryExpression) {
			return buildUnarySubCfg((UnaryExpression) node);
		}
		
		return new SubCfg();
	}
	
	public SubCfg buildUnarySubCfg(UnaryExpression unary) {
		int operator = unary.getOperator();
		NumberLiteral delta = new NumberLiteral();
		delta.setValue("1");
		
		AstNode left = unary.getOperand();
		InfixExpression right = new InfixExpression(left, delta);
		if (operator == Token.INC) {
			right.setOperator(Token.ADD);
		} else if (operator == Token.DEC) {
			right.setOperator(Token.SUB);
		}
		Assignment assignment = new Assignment(left, right);
		Statement statement = new Statement(assignment, index, this.nodeMap);
		index++;
		
		return new SubCfg(statement, statement);
	}

	public SubCfg buildReturnSubCfg(ReturnStatement returnStatement) {
		Statement statement = new Statement(returnStatement, index, this.nodeMap);
		index++;
		return new SubCfg(statement, statement);
	}

	public void buildBodySubCfg(AstNode body) {
		if (body instanceof Block) {
			buildBlockSubCfg((Block) body);
		}
	}
	
	public SubCfg buildVariableDeclarationSubCfg(VariableDeclaration varDecl) {
		List<VariableInitializer> variables = varDecl.getVariables();
		SubCfg subCfg = new SubCfg();
		SubCfg temp = null;
		for (VariableInitializer var: variables) {
			temp = buildVariableInitializerSubCfg(var);
			subCfg.append(temp);
		}
		
		return subCfg;
	}
	
	public SubCfg buildVariableInitializerSubCfg(VariableInitializer varInit) {
		if (varInit.getInitializer() != null) {
			Statement statement = new Statement(varInit, index, this.nodeMap);
			index++;
			return new SubCfg(statement, statement);
		}
		
		return new SubCfg();
	}
	
	public SubCfg buildBlockSubCfg(Block block) {
		SubCfg subCfg = new SubCfg();
		AstNode next = (AstNode) block.getFirstChild();
		SubCfg temp = null;
		while (next != null) {
			temp = buildSubCfg(next);
			if (temp != null) {
				subCfg.append(temp);
			}
			next = (AstNode) next.getNext();
		}
		
		return subCfg;
	}
	
	public SubCfg buildScopeSubCfg(Scope scope) {
		SubCfg subCfg = new SubCfg();
		AstNode next = (AstNode) scope.getFirstChild();
		SubCfg temp = null;
		while (next != null) {
			temp = buildSubCfg(next);
			if (temp != null) {
				subCfg.append(temp);
			}
			next = (AstNode) next.getNext();
		}
		
		return subCfg;
	}
	
	public SubCfg buildIfSubCfg(IfStatement ifStatement) {
		AstNode condition = ifStatement.getCondition();
		int conditionIndex = index++;
		
		SubCfg trueBranch = buildSubCfg(ifStatement.getThenPart());
		SubCfg falseBranch = buildSubCfg(ifStatement.getElsePart());
		MergeNode mergeNode = new MergeNode();
		
		trueBranch.appendNode(mergeNode);
		falseBranch.appendNode(mergeNode);
		
		SubCfg subCfg = buildDecisionSubCfg(condition, trueBranch, falseBranch, mergeNode, conditionIndex);
		
		return subCfg;
	}
	
	public SubCfg buildForLoopSubCfg(ForLoop forLoop) {
		SubCfg initializers = buildSubCfg(forLoop.getInitializer());
		int conditionIndex = index++;
		
		SubCfg body = buildSubCfg(forLoop.getBody());
		SubCfg increment = buildSubCfg(forLoop.getIncrement());
		SubCfg trueBranch = body.append(increment);
		SubCfg falseBranch = new SubCfg();
		
		MergeNode mergeNode = new MergeNode();
		trueBranch.appendNode(mergeNode);
		falseBranch.appendNode(mergeNode);
		
		AstNode condition = forLoop.getCondition();
		SubCfg decisionCfg = buildDecisionSubCfg(condition, trueBranch, falseBranch, mergeNode, conditionIndex);
		
		SubCfg subCfg = initializers.append(decisionCfg);

		return subCfg;
	}
	
	public SubCfg buildExpressionSubCfg(ExpressionStatement expressionStatement) {
		AstNode expression = expressionStatement.getExpression();
		getDefUse(expression, index);
		Statement statement = new Statement(expression, index, this.nodeMap);
		index++;
		SubCfg subCfg = new SubCfg(statement, statement);
		
		return subCfg;
	}
	
	public SubCfg buildDecisionSubCfg(AstNode condition, SubCfg trueBranch,
										SubCfg falseBranch, MergeNode mergeNode, int index) {
		
		DecisionNode decisionNode = new DecisionNode(condition, index, this.nodeMap);
		decisionNode.setTrueBranch(trueBranch.getBegin());
		decisionNode.setFalseBranch(falseBranch.getBegin());
		decisionNode.setMergeNode(mergeNode);
		
		return new SubCfg(decisionNode, mergeNode);
	}
	
	public void getDefUse(AstNode astNode, int cfgNodeIndex) {
		if (astNode instanceof Assignment) {
			Assignment assigment = (Assignment) astNode;
			getDefUse(assigment.getRight(), cfgNodeIndex);
			getDefUse(assigment.getRight(), cfgNodeIndex);
		} else if (astNode instanceof InfixExpression) {
			InfixExpression infix = new InfixExpression();
			getDefUse(infix.getRight(), cfgNodeIndex);
			getDefUse(infix.getRight(), cfgNodeIndex);
		} else if (astNode instanceof UnaryExpression) {
			UnaryExpression unary = (UnaryExpression) astNode;
			getDefUse(unary.getOperand(), cfgNodeIndex);
		}
	}
}
