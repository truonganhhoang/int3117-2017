package trippleT.cfg;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Cfg extends AbstractCfg {
	private List<List<Integer>> allPaths;
	private Map<Integer, CfgNode> nodeMap;
	private List<String> params;
	
	public Cfg(SubCfg subCfg, Map<Integer, CfgNode> nodeMap, List<String> params) {
		if (subCfg.getBegin() != null) {
			begin = new BeginNode();
			begin.next = subCfg.getBegin();
			end = new EndNode();
			subCfg.getEnd().setNext(end);
			
			this.nodeMap = nodeMap;
			this.params = params;
		}
	}
	
	public List<String> getParams() {
		return params;
	}
	
	public Map<Integer, CfgNode> getNodeMap() {
		return nodeMap;
	}
	
	public List<List<Integer>> getAllPossiblePaths() {
		allPaths = new ArrayList<List<Integer>>();
		List<Integer> currentPath = new ArrayList<Integer>();
		generateAllPossiblePaths(begin, currentPath);
		
		return allPaths;
	}
	
	public void generateAllPossiblePaths(CfgNode node, List<Integer> currentPath) {
		if (node == this.end || node == null) {
			List<Integer> path = new ArrayList<Integer>(currentPath);
			allPaths.add(path);
		} else if (node.getIndex() == -1) {
			generateAllPossiblePaths(node.getNext(), currentPath);
		} else if (node instanceof DecisionNode) {
			DecisionNode decisionNode = (DecisionNode) node;
			int index = node.getIndex();
			
			currentPath.add(index);
			generateAllPossiblePaths(decisionNode.getTrueBranch(), currentPath);
			currentPath.remove(currentPath.size()-1);
			
			currentPath.add(-index);
			generateAllPossiblePaths(decisionNode.getFalseBranch(), currentPath);
			currentPath.remove(currentPath.size()-1);
		} else {
			currentPath.add(node.getIndex());
			generateAllPossiblePaths(node.getNext(), currentPath);
			currentPath.remove(currentPath.size()-1);
		}
	}
}
