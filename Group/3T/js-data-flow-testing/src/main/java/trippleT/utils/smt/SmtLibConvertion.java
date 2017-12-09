package trippleT.utils.smt;

import java.util.ArrayList;
import java.util.List;

import org.mozilla.javascript.Token;
import org.mozilla.javascript.ast.Assignment;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.InfixExpression;
import org.mozilla.javascript.ast.UnaryExpression;
import org.mozilla.javascript.ast.VariableInitializer;

public class SmtLibConvertion {
	public static List<String> convert(List<AstNode> nodeList) {
		List<String> smtLibStrList = new ArrayList<>();
		for (AstNode node : nodeList) {
			smtLibStrList.add(convert(node));
		}
		
		return smtLibStrList;
	}
	
	public static String convert(AstNode node) {
		if (node instanceof Assignment) {
			Assignment assignment = (Assignment) node;
			return bracket(convert(assignment.getLeft()), 
							"=", 
							convert(assignment.getRight()));
		} else if (node instanceof InfixExpression) {
			InfixExpression infix = (InfixExpression) node;
			return bracket(convert(infix.getLeft()), 
								getCorrespondBinaryOperator(infix.getOperator()), 
								convert(infix.getRight()));
		} else if (node instanceof UnaryExpression) {
			UnaryExpression unary = (UnaryExpression) node;
			return bracket(getCorrespondUnaryOperator(unary.getOperator()), 
								convert(unary.getOperand()));
		} else if (node instanceof VariableInitializer) {
			VariableInitializer varInit = (VariableInitializer) node;
			return bracket(convert(varInit.getTarget()), 
							"=", 
							convert(varInit.getInitializer()));
		} else {
			return node.getString();
		}
	}
	
	public static String bracket(String left, String operator, String right) {
		return String.format("(%s %s %s)", operator, left, right);
	}
	
	public static String bracket(String operator, String operand) {
		return String.format("(%s %s)", operator, operand);
	}
	
	public static String getCorrespondBinaryOperator(int op) {
		if (op == Token.EQ) {
			return "=";
		} else if (op == Token.NE) {
			return "distinct";
		} else if (op == Token.OR) {
			return "or";
		} else if (op == Token.AND) {
			return "and";
		} else {
			return AstNode.operatorToString(op);
		}
	} 
	
	public static String getCorrespondUnaryOperator(int op) {
		if (op == Token.NOT) {
			return "not";
		} else {
			return AstNode.operatorToString(op);
		}
	}
}
