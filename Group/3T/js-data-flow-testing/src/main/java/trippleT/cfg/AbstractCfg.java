package trippleT.cfg;

public abstract class AbstractCfg {
	protected CfgNode begin;
	protected CfgNode end;
	
	/**
	 * @return the begin
	 */
	public CfgNode getBegin() {
		return begin;
	}
	/**
	 * @param begin the begin to set
	 */
	public void setBegin(CfgNode begin) {
		this.begin = begin;
	}
	/**
	 * @return the end
	 */
	public CfgNode getEnd() {
		return end;
	}
	/**
	 * @param end the end to set
	 */
	public void setEnd(CfgNode end) {
		this.end = end;
	}
	
	public void print() {
		if (begin == null) {
			return;
		}
		
		print(begin, null);
	}
	
	public void print(CfgNode node, CfgNode end) {
		if (node == null || node == end) {
			return;
		}
		
		if (node instanceof DecisionNode) {
			DecisionNode decision = (DecisionNode) node;
			System.out.println("Decision Node: " + node);
			MergeNode mergeNode = decision.getMergeNode();
			print(decision.getTrueBranch(), mergeNode);
			print(decision.getFalseBranch(), mergeNode);
			print(mergeNode, end);
		} else if (node instanceof Statement) {
			System.out.println("statement: " + node);
			print(node.getNext(), end);
		} else {
			print(node.getNext(), end);
		}
	}
}
