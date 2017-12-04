package trippleT.cfg;

import java.io.FileReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.IRFactory;
import org.mozilla.javascript.Node;
import org.mozilla.javascript.ast.Assignment;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.ExpressionStatement;
import org.mozilla.javascript.ast.FunctionNode;
import org.mozilla.javascript.ast.InfixExpression;
import org.mozilla.javascript.ast.Name;
import org.mozilla.javascript.ast.NumberLiteral;
import org.mozilla.javascript.ast.VariableInitializer;

import trippleT.DFTesting.AllDefs;
import trippleT.cfg.Cfg;
import trippleT.cfg.CfgBuilder;
import trippleT.cfg.CfgNode;
import trippleT.cfg.DecisionNode;
import trippleT.doSomething.FromInfixToPrefix;
import trippleT.solver.Z3Solver;
import trippleT.solver.result.InputPathResult;
import trippleT.solver.result.ResultParser;
import trippleT.utils.astnode.CloneExpression;
import trippleT.utils.smt.MakeSmt;


public class BuildDfgTest {

	public static void main(String[] args) throws Exception
	{
		String filePath = "test.js";
		
		BuildDfgTest demo = new BuildDfgTest();
		demo.parseJS(filePath);
	}
	
	public void parseJS (String filePath) throws Exception
	{
		CompilerEnvirons env = new CompilerEnvirons();
		env.setRecoverFromErrors(true);
		env.setLanguageVersion(170);
		
		FileReader strReader = new FileReader(filePath);

		IRFactory factory = new IRFactory(env);
		AstRoot rootNode = factory.parse(strReader, null, 0);
		
		Node firstNode = rootNode.getFirstChild();
		
		ResultParser resultParser = new ResultParser();
		
		if (firstNode instanceof FunctionNode) {
			FunctionNode function = (FunctionNode) firstNode;
			CfgBuilder builder = new CfgBuilder();
			Cfg cfg = builder.buildCfg(function);
//			cfg.print();
			
			List<String> params = cfg.getParams();
			
			//all defs theo bien a
			
			
			List<List<Integer>> allPaths = cfg.getAllPossiblePaths();
			int index = 1;
			for (List<Integer> currentPath: AllDefs.getPathsWithAllDefs(cfg, allPaths, params.get(0))) {
				Map<String, AstNode> environment = new HashMap<String, AstNode>();
				for (String param: params) {
					Name name = new Name(0, param+"_s");
					environment.put(param, name);
				}
				Map<Integer, CfgNode> nodeMap = cfg.getNodeMap();
				List<String> constraints = new ArrayList<String>();
				for(Integer keyOfNode: currentPath) {
					CfgNode currentNode = (keyOfNode > 0)?nodeMap.get(keyOfNode):nodeMap.get(-keyOfNode);
					if (currentNode.getAstNode() instanceof Assignment) {
						
						InfixExpression infix = (InfixExpression) currentNode.getAstNode();
						AstNode left = infix.getLeft();
						AstNode right = infix.getRight();
					
						AstNode clone = CloneExpression.cloneExpressionAndReplace(right, environment);
						environment.put(left.getString(), clone);
						
					} else if (currentNode.getAstNode() instanceof VariableInitializer) {
						VariableInitializer vi = (VariableInitializer) currentNode.getAstNode();
						AstNode right = vi.getInitializer();
						AstNode left = vi.getTarget();
						
						AstNode clone = CloneExpression.cloneExpressionAndReplace(right, environment);
						environment.put(left.getString(), clone);
//						if (clone instanceof NumberLiteral) {
//							NumberLiteral number = (NumberLiteral) clone;
//							System.out.println(left.getString() + " " + number.getValue());
//						} else if (clone instanceof InfixExpression) {
//							System.out.println(left.getString() + " " + clone.toSource());
//						}
//						else {
//							System.out.println("clone " + clone.getString());
//						}
					} else if (currentNode instanceof DecisionNode) {
						InfixExpression infix = (InfixExpression) currentNode.getAstNode();
						AstNode left = infix.getLeft();
						AstNode right = infix.getRight();
						AstNode leftCondition = CloneExpression.cloneExpressionAndReplace(left, environment);
						AstNode rightCondition = CloneExpression.cloneExpressionAndReplace(right, environment);
						String constraint;
//						System.out.println(rightCondition.getClass());
						
						constraint = FromInfixToPrefix.convert(leftCondition, infix.operatorToString(infix.getOperator()), rightCondition, keyOfNode > 0) ;
//						
						constraints.add(constraint);
					}
				}
				
				String filename = "path" + index++ + ".smt2";
				MakeSmt.make(params, constraints, filename);
				//result
				List<String> result = Z3Solver.runZ3(filename);
				resultParser.setListParameter(params);
				resultParser.setPath(currentPath);
				InputPathResult inputPathResult = resultParser.generateInputPathResult(result);
				System.out.println(currentPath);
				inputPathResult.print();
			}
			System.out.println(allPaths);
		}
	}	
}
