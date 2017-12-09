package trippleT.utils.astnode;

import java.io.FileReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.IRFactory;
import org.mozilla.javascript.Node;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.ExpressionStatement;
import org.mozilla.javascript.ast.InfixExpression;
import org.mozilla.javascript.ast.KeywordLiteral;
import org.mozilla.javascript.ast.Name;
import org.mozilla.javascript.ast.NumberLiteral;
import org.mozilla.javascript.ast.ParenthesizedExpression;
import org.mozilla.javascript.ast.UnaryExpression;

public class CloneExpression {
	
	public static AstNode cloneExpressionAndReplace(AstNode node, Map<String, AstNode> environment) {
		if (node instanceof InfixExpression) {
			InfixExpression infix = (InfixExpression) node;
			AstNode leftOperand = cloneExpressionAndReplace(infix.getLeft(), environment);
			AstNode rightOperand = cloneExpressionAndReplace(infix.getRight(), environment);
			
			InfixExpression cloneExpression = new InfixExpression(leftOperand, rightOperand);
			cloneExpression.setOperator(infix.getOperator());
			return cloneExpression;
		}
		else if (node instanceof UnaryExpression) {
			UnaryExpression unary = (UnaryExpression) node;
			AstNode operand = cloneExpressionAndReplace(unary.getOperand(), environment);
			
			UnaryExpression cloneExpression = new UnaryExpression(unary.getOperator(), -1, operand);
			return cloneExpression;
		}
		else if (node instanceof Name) {
			Name name = (Name) node;
			AstNode var = environment.get(name.getString());
			if (var != null) {
				
				return var;
			}
			return new Name(-1, name.getString());
		}
		else if (node instanceof ParenthesizedExpression) {
			ParenthesizedExpression parenthesize = (ParenthesizedExpression) node;
			AstNode expr = cloneExpressionAndReplace(parenthesize.getExpression(), environment);
			return new ParenthesizedExpression(expr);
		}
		else if (node instanceof NumberLiteral) {
			NumberLiteral numberLiteral = (NumberLiteral) node;
			String value = numberLiteral.getValue();		
			NumberLiteral number = new NumberLiteral(-1, value);
			return number;
		}
		else if (node instanceof KeywordLiteral) {
			KeywordLiteral keywordLiteral = (KeywordLiteral) node;
			KeywordLiteral clone = new KeywordLiteral();
			clone.setType(keywordLiteral.getType());
			return clone;
		}
		
//		System.out.println("class: " + node.getClass());
		
		return null;
	}
	
	public static AstNode cloneExpression(AstNode node) {
		if (node instanceof InfixExpression) {
			InfixExpression infix = (InfixExpression) node;
			AstNode leftOperand = cloneExpression(infix.getLeft());
			AstNode rightOperand = cloneExpression(infix.getRight());
			
			InfixExpression cloneExpression = new InfixExpression(leftOperand, rightOperand);
			cloneExpression.setOperator(infix.getOperator());
			return cloneExpression;
		}
		else if (node instanceof UnaryExpression) {
			UnaryExpression unary = (UnaryExpression) node;
			AstNode operand = cloneExpression(unary.getOperand());
			
			UnaryExpression cloneExpression = new UnaryExpression(unary.getOperator(), -1, operand);
			return cloneExpression;
		}
		else if (node instanceof Name) {
			Name name = (Name) node;
			return new Name(-1, name.getString());
		}
		else if (node instanceof ParenthesizedExpression) {
			ParenthesizedExpression parenthesize = (ParenthesizedExpression) node;
			AstNode expr = cloneExpression(parenthesize.getExpression());
			return new ParenthesizedExpression(expr);
		}
		else if (node instanceof NumberLiteral) {
			NumberLiteral numberLiteral = (NumberLiteral) node;
			String value = numberLiteral.getValue();		
			return new NumberLiteral(-1, value);
		}
		else if (node instanceof KeywordLiteral) {
			KeywordLiteral keywordLiteral = (KeywordLiteral) node;
			KeywordLiteral clone = new KeywordLiteral();
			clone.setType(keywordLiteral.getType());
			return clone;
		}
		
//		System.out.println("class: " + node.getClass());
		
		return null;
	}
}
