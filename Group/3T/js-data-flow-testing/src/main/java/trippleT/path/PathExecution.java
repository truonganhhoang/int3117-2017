package trippleT.path;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mozilla.javascript.Token;
import org.mozilla.javascript.ast.Assignment;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.Name;
import org.mozilla.javascript.ast.UnaryExpression;
import org.mozilla.javascript.ast.VariableInitializer;

import trippleT.cfg.CfgNode;
import trippleT.cfg.DecisionNode;
import trippleT.solver.Z3Solver;
import trippleT.solver.result.DefineFun;
import trippleT.solver.result.InputPathResult;
import trippleT.solver.result.ResultParser;
import trippleT.utils.astnode.CloneExpression;
import trippleT.utils.astnode.StringGetter;
import trippleT.utils.smt.MakeSmt;
import trippleT.utils.smt.SmtLibConvertion;

public class PathExecution {
	private static int index = 1;
	
    public PathExecutionResult executePath(List<Integer> path, 
    										List<String> params, Map<Integer, 
    										CfgNode> nodeMap) 
    		throws IOException {
    	Map<String, AstNode> environment = new HashMap<String, AstNode>();
        List<AstNode> pathConstraints = new ArrayList<AstNode>();
        List<AstNode> pathConstraintsOrigin = new ArrayList<AstNode>();
        
        addParamsToEnvironment(params, environment);
        
        CfgNode cfgNode;
        for (Integer nodeIndex : path) {
            cfgNode = nodeMap.get(Math.abs(nodeIndex));
            if (cfgNode instanceof DecisionNode) {
                DecisionNode decision = (DecisionNode) cfgNode;
                AstNode condition = null;
                if (nodeIndex < 0) {
                    condition = negativeCondition(decision.getCondition());
                } else {
                	condition = decision.getCondition();
                }
                
                pathConstraintsOrigin.add(condition);
                
                condition = CloneExpression.cloneExpressionAndReplace(condition, environment);
                pathConstraints.add(condition);
            } else {
                putVariable(cfgNode.getAstNode(), environment);
            }
        }
        
        ResultParser resultParser = new ResultParser();
		String filename = "path_" + (index++) + ".smt2";
		List<String> pathConstraintsStrList = SmtLibConvertion.convert(pathConstraints); 
		
		MakeSmt.make(params, pathConstraintsStrList, filename);
		//result
		List<String> result = Z3Solver.runZ3(filename);
		resultParser.setListParameter(params);
		resultParser.setPath(path);
		InputPathResult inputPathResult = resultParser.generateInputPathResult(result);
		
		List<String> pathContraintsOriginStr = StringGetter.toSource(pathConstraintsOrigin);
		
		PathExecutionResult pathExecutionResult = 
				new PathExecutionResult(path, pathContraintsOriginStr, inputPathResult);
		
		return pathExecutionResult;
    }
    
    public AstNode negativeCondition(AstNode node, Map<String, AstNode> environment) {
        AstNode clone = CloneExpression.cloneExpressionAndReplace(node, environment);
        UnaryExpression unary = new UnaryExpression();
        unary.setOperand(clone);
        unary.setOperator(Token.NOT);
        
        return unary;
    }
    
    public AstNode negativeCondition(AstNode node) {
        AstNode clone = CloneExpression.cloneExpression(node);
        UnaryExpression unary = new UnaryExpression();
        unary.setOperand(clone);
        unary.setOperator(Token.NOT);
        
        return unary;
    }
    
    public void putVariable(AstNode node, Map<String, AstNode> environment) {
        if (node instanceof Assignment) {
            Assignment assignment = (Assignment) node;
            AstNode right = CloneExpression.cloneExpressionAndReplace(assignment.getRight(), environment);
            AstNode left = assignment.getLeft();
            String varName = left.getString();
            environment.put(varName, right);
        }
        else if (node instanceof VariableInitializer) {
            VariableInitializer varInit = (VariableInitializer) node;
            AstNode target = varInit.getTarget();
            AstNode init = varInit.getInitializer();
            if (init != null) {
                AstNode clone = CloneExpression.cloneExpressionAndReplace(init, environment);
                environment.put(target.getString(), clone);
            }
        }
    }
    
    public void addParamsToEnvironment(List<String> params, Map<String, AstNode> environment) {
        for (String param : params) {
            Name var = new Name();
            var.setString(param + "_s");
            environment.put(param, var);
        }
    }
}
