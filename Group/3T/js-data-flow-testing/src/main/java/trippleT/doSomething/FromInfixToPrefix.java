package trippleT.doSomething;

import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.InfixExpression;
import org.mozilla.javascript.ast.Name;

public class FromInfixToPrefix {

	public static final String EQUAL = "==";
	public static final String DISTINCT = "!=";
	
	public static void main(String[] args) {
//		System.out.println(convert("a", ">", "b", true));

	}
	
	public static String convert(AstNode leftOperand, String operator, AstNode rightOperand, boolean positive)
	{
		String result= "";
		String leftOperandString = "";
		String rightOperandString = "";
		if (leftOperand instanceof InfixExpression) {
			InfixExpression ie = (InfixExpression) leftOperand;
			leftOperandString = convert(ie.getLeft(), ie.operatorToString(ie.getOperator()), ie.getRight(), true);
		} else {
			Name name = (Name) leftOperand;
			leftOperandString = name.getString();
		}
		
		if (rightOperand instanceof InfixExpression) {
			InfixExpression ie = (InfixExpression) rightOperand;
			rightOperandString = convert(ie.getLeft(), ie.operatorToString(ie.getOperator()), ie.getRight(), true);
		} else {
			Name name = (Name) rightOperand;
			rightOperandString = name.getString();
		}
			
		if (operator.equals(EQUAL)) {
			result = "(= " + leftOperandString + " " + rightOperandString + ")"; 
		} else {
			result = "(" + operator + " " + leftOperandString + " " + rightOperandString + ")";
		}
		
		if (!positive) {
			result = "(not " + result + ")";
		}
		
		
		return result;
		
	}

}
