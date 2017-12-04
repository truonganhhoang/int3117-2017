package trippleT.cfg;

import java.util.Map;

import org.mozilla.javascript.ast.AstNode;

import trippleT.utils.astnode.StringGetter;

public class Statement extends CfgNode {
	public Statement() {
		super();
	}
	
//	public Statement(AstNode expression) {
//		super(expression);
//	}
	
//	public Statement(AstNode expression, int index) {
//		super(expression, index);
//	}
	
	public Statement(AstNode astNode, int index, Map<Integer, CfgNode> nodeMap) {
		super(astNode, index, nodeMap);
	}
	
	public AstNode getExpression() {
		return astNode;
	}
}
