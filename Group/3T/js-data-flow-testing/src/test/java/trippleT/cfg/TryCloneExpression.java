package trippleT.cfg;

import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;

import org.mozilla.javascript.CompilerEnvirons;
import org.mozilla.javascript.IRFactory;
import org.mozilla.javascript.ast.AstNode;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.ExpressionStatement;
import org.mozilla.javascript.ast.InfixExpression;
import org.mozilla.javascript.ast.Name;

import trippleT.utils.astnode.CloneExpression;
import trippleT.utils.astnode.StringGetter;

public class TryCloneExpression {
	public static void main(String[] args) throws Exception
	{
		String filePath = "test2.js";
		
		CompilerEnvirons env = new CompilerEnvirons();
		env.setRecoverFromErrors(true);
		env.setLanguageVersion(170);
		
		FileReader strReader = new FileReader(filePath);

		IRFactory factory = new IRFactory(env);
		AstRoot rootNode = factory.parse(strReader, null, 0);
		
		AstNode node = (AstNode) rootNode.getFirstChild();
		
		Map<String, AstNode> environment = new HashMap<String, AstNode>();
		Name e = new Name(0, "e");
		environment.put("e", e);
		Name f = new Name(0, "f");
		environment.put("f", f);
		
		while(node != null) {
			if (node instanceof ExpressionStatement) {
				System.out.println(node.getClass());
				ExpressionStatement expSt = (ExpressionStatement) node;
				InfixExpression infix = (InfixExpression) expSt.getExpression();
				AstNode left = infix.getLeft();
				AstNode right = infix.getRight();
				AstNode clone = CloneExpression.cloneExpressionAndReplace(right, environment);
				environment.put(left.getString(), clone);
			}
			
			node = (AstNode) node.getNext();
		}
		
		System.out.println(environment);
		for (Map.Entry<String, AstNode> entry : environment.entrySet())
		{
			System.out.println("key: " + entry.getKey());
		    System.out.println("value: " + StringGetter.toSource(entry.getValue()));
		}
		
//		if (firstNode instanceof ExpressionStatement) {
//			System.out.println(firstNode.toSource());
//			ExpressionStatement expSt = (ExpressionStatement) firstNode;
//			AstNode expr = expSt.getExpression();
//			InfixExpression infix = (InfixExpression) expr;
//			AstNode cloneExpr = cloneExpression(expr);
//			String str = StringGetter.toSource(cloneExpr);
//			System.out.println("clone: " + str);
//		}
	}
	
}
