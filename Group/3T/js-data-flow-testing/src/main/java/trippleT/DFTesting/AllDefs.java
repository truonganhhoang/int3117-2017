package trippleT.DFTesting;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.mozilla.javascript.ast.Assignment;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.InfixExpression;
import org.mozilla.javascript.ast.Name;
import org.mozilla.javascript.ast.ReturnStatement;
import org.mozilla.javascript.ast.VariableInitializer;

import trippleT.cfg.Cfg;
import trippleT.cfg.CfgNode;
import trippleT.cfg.DecisionNode;
import trippleT.doSomething.FromInfixToPrefix;
import trippleT.utils.astnode.CloneExpression;

public class AllDefs {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	public static List<List<Integer>> getPathsWithAllDefs(Cfg cfg, List<List<Integer>> allPaths, String param) {
		List<List<Integer>> result = new ArrayList<List<Integer>>();
		Map<Integer, CfgNode> nodeMap = cfg.getNodeMap();
		for(List<Integer> path: allPaths) {
//			System.out.println(path);
			List<Integer> duPath = new ArrayList<Integer>();
			boolean hasDefUse = false;
			for(Integer keyOfNode: path) {
				CfgNode currentNode = (keyOfNode > 0)?nodeMap.get(keyOfNode):nodeMap.get(-keyOfNode);
				if (currentNode.getAstNode() instanceof Assignment) {
					duPath.add(keyOfNode);
					InfixExpression infix = (InfixExpression) currentNode.getAstNode();
					
					AstNode left = infix.getLeft();
					AstNode right = infix.getRight();
					if (hasDefUse && checkParamInStatement(right, param)) {
						if (!result.contains(cloneList(duPath))) {
							result.add(cloneList(duPath));
						}
					}
					
					if (!hasDefUse && left.toSource().equals(param) ) {
						hasDefUse = true;
					}
					
					
				} else if (currentNode.getAstNode() instanceof VariableInitializer) {
					duPath.add(keyOfNode);
					VariableInitializer vi = (VariableInitializer) currentNode.getAstNode();
					AstNode right = vi.getInitializer();
					AstNode left = vi.getTarget();
					if (hasDefUse && checkParamInStatement(right, param)) {
						if (!result.contains(cloneList(duPath))) {
							result.add(cloneList(duPath));
						}
					}
					
					if (left.toSource().equals(param)) {
						hasDefUse = true;
					}
					
					
				} else if (currentNode instanceof DecisionNode) {
					duPath.add(keyOfNode);
					InfixExpression infix = (InfixExpression) currentNode.getAstNode();
					AstNode left = infix.getLeft();
					AstNode right = infix.getRight();
					if (hasDefUse && (checkParamInStatement(right, param) || checkParamInStatement(left, param))) {
						if (!result.contains(cloneList(duPath))) {
							result.add(cloneList(duPath));
						}
					}
					
				} else if(currentNode.getAstNode() instanceof ReturnStatement) {
					duPath.add(keyOfNode);
					ReturnStatement rs = (ReturnStatement) currentNode.getAstNode();
					if (rs.getReturnValue().getString().equals(param) && hasDefUse) {
						result.add(cloneList(duPath));
					}
				}
			}
		}
//		result.forEach(System.out::println);
		return result;
		
	}
	
	public static List<Integer> cloneList(List<Integer> list) {
	    List<Integer> clone = new ArrayList<Integer>(list.size());
	    for (Integer item : list) clone.add(item);
	    return clone;
	}
	
	public static boolean checkParamInStatement(AstNode node, String param) {
		if (node instanceof Name) {
			return node.toSource().equals(param);
		} else if (node instanceof InfixExpression) {
			InfixExpression ie = (InfixExpression) node;
			return (checkParamInStatement(ie.getLeft(), param) || checkParamInStatement(ie.getRight(),param));
		} else {
			return false;
		}
		
	}

}
