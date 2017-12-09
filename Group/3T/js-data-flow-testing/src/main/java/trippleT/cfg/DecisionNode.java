package trippleT.cfg;

import java.util.Map;

import org.mozilla.javascript.ast.AstNode;

public class DecisionNode extends CfgNode {
	protected CfgNode falseBranch;
	// trueBranch is next
	protected MergeNode mergeNode;
	
	public DecisionNode() {
		
	}
	
	public DecisionNode(AstNode astNode) {
		super(astNode);
	}
	
//	public DecisionNode(AstNode astNode, int index) {
//		super(astNode, index);
//	}
	
	public DecisionNode(AstNode astNode, int index, Map<Integer, CfgNode> nodeMap) {
		super(astNode, index, nodeMap);
	}
	
	
	public AstNode getCondition() {
		return astNode;
	}
	
	/**
	 * @return the trueBranch
	 */
	public CfgNode getTrueBranch() {
		return next;
	}

	/**
	 * @param falseBranch the trueBranch to set
	 */
	public void setTrueBranch(CfgNode trueBranch) {
		next = trueBranch;
	}

	/**
	 * @return the falseBranch
	 */
	public CfgNode getFalseBranch() {
		return falseBranch;
	}

	/**
	 * @param falseBranch the falseBranch to set
	 */
	public void setFalseBranch(CfgNode falseBranch) {
		this.falseBranch = falseBranch;
	}

	/**
	 * @return the mergeNode
	 */
	public MergeNode getMergeNode() {
		return mergeNode;
	}

	/**
	 * @param mergeNode the mergeNode to set
	 */
	public void setMergeNode(MergeNode mergeNode) {
		this.mergeNode = mergeNode;
	}
	
	@Override
	public CfgNode getNext() {
		return mergeNode;
	}
}
