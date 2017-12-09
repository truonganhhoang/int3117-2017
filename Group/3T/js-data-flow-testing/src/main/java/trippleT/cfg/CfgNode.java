package trippleT.cfg;

import java.util.ArrayList;
import java.util.Map;

import org.mozilla.javascript.ast.AstNode;

import trippleT.utils.astnode.StringGetter;

public abstract class CfgNode {
	protected int index = -1;
	protected ArrayList<String> defs;
	protected ArrayList<String> cUses;
	protected ArrayList<String> pUse;
	protected CfgNode next;
	protected CfgNode previous;
	protected AstNode astNode;
	
	public CfgNode() {
		this.astNode = null;
	}
	
	public CfgNode(AstNode astNode) {
		this.astNode = astNode;
	}
	
	public CfgNode(AstNode astNode, int index) {
		this.astNode = astNode;
		this.index = index;
	}
	
	public CfgNode(AstNode astNode, int index, Map<Integer, CfgNode> nodeMap) {
		this.astNode = astNode;
		this.index = index;
		
		nodeMap.put(index, this);
	}
	
	public CfgNode(AstNode astNode, CfgNode next, CfgNode previous) {
		this.astNode = astNode;
		this.next = next;
		this.previous = previous;
	}
	
	/**
	 * @return the index
	 */
	public int getIndex() {
		return index;
	}
	/**
	 * @param index the index to set
	 */
	public void setIndex(int index) {
		this.index = index;
	}
	/**
	 * @return the defs
	 */
	public ArrayList<String> getDefs() {
		return defs;
	}
	/**
	 * @param defs the defs to set
	 */
	public void setDefs(ArrayList<String> defs) {
		this.defs = defs;
	}
	/**
	 * @return the cUses
	 */
	public ArrayList<String> getcUses() {
		return cUses;
	}
	/**
	 * @param cUses the cUses to set
	 */
	public void setcUses(ArrayList<String> cUses) {
		this.cUses = cUses;
	}
	/**
	 * @return the pUse
	 */
	public ArrayList<String> getpUse() {
		return pUse;
	}
	/**
	 * @param pUse the pUse to set
	 */
	public void setpUse(ArrayList<String> pUse) {
		this.pUse = pUse;
	}
	/**
	 * @return the next
	 */
	public CfgNode getNext() {
		return next;
	}
	/**
	 * @param next the next to set
	 */
	public void setNext(CfgNode next) {
		this.next = next;
	}
	/**
	 * @return the previous
	 */
	public CfgNode getPrevious() {
		return previous;
	}
	/**
	 * @param previous the previous to set
	 */
	public void setPrevious(CfgNode previous) {
		this.previous = previous;
	}
	/**
	 * @return the astNode
	 */
	public AstNode getAstNode() {
		return astNode;
	}
	/**
	 * @param astNode the astNode to set
	 */
	public void setAstNode(AstNode astNode) {
		this.astNode = astNode;
	}
	
	public String toString() {
		return String.format("%s index: %d, class: %s", StringGetter.toSource(astNode), index, this.astNode.getClass());
	}
}
