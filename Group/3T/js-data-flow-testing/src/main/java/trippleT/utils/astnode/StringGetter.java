package trippleT.utils.astnode;

import java.util.ArrayList;
import java.util.List;

import org.mozilla.javascript.ast.Assignment;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.InfixExpression;
import org.mozilla.javascript.ast.UnaryExpression;
import org.mozilla.javascript.ast.VariableInitializer;

public class StringGetter {
	public static List<String> toSource(List<AstNode> nodeList) {
		List<String> sourceList = new ArrayList<>();
		for (AstNode node : nodeList) {
			sourceList.add(toSource(node));
		}
		
		return sourceList;
	}
	
	public static String toSource(AstNode node) {
		if (node instanceof Assignment) {
			Assignment assignment = (Assignment) node;
			return String.format("%s %s %s", StringGetter.toSource(assignment.getLeft()), 
								"=", 
								StringGetter.toSource(assignment.getRight()));
		} else if (node instanceof InfixExpression) {
			InfixExpression infix = (InfixExpression) node;
			return StringGetter.bracket(StringGetter.toSource(infix.getLeft()), 
								AstNode.operatorToString(infix.getOperator()), 
								StringGetter.toSource(infix.getRight()));
		} else if (node instanceof UnaryExpression) {
			UnaryExpression unary = (UnaryExpression) node;
			return StringGetter.bracket(AstNode.operatorToString(unary.getOperator()), 
								StringGetter.toSource(unary.getOperand()));
		} else if (node instanceof VariableInitializer) {
			VariableInitializer varInit = (VariableInitializer) node;
			return String.format("%s %s %s", StringGetter.toSource(varInit.getTarget()), 
								"=", 
								StringGetter.toSource(varInit.getInitializer()));
		} else {
			return node.toSource();
		}
	}
	
	public static String bracket(String left, String operator, String right) {
		return String.format("(%s %s %s)", left, operator, right);
	}
	
	public static String bracket(String operator, String operand) {
		return String.format("(%s %s)", operator, operand);
	}
}
