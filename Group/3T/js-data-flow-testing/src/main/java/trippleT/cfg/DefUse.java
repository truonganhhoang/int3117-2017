package trippleT.cfg;

import java.util.ArrayList;
import java.util.List;

public class DefUse {
	private String variableName;
	private List<Integer> defs = new ArrayList<Integer>();
	private List<Integer> cUses = new ArrayList<Integer>();
	private List<Integer> pUses = new ArrayList<Integer>();
	
	public DefUse(String variableName) {
		this.variableName = variableName;
	}
	
	public void addDef(int nodeIndex) {
		defs.add(nodeIndex);
	}
	
	public void addCUse(int nodeIndex) {
		cUses.add(nodeIndex);
	}
	
	public void addPUse(int nodeIndex) {
		pUses.add(nodeIndex);
	}
	
	
	/**
	 * @return the variableName
	 */
	public String getVariableName() {
		return variableName;
	}

	/**
	 * @param variableName the variableName to set
	 */
	public void setVariableName(String variableName) {
		this.variableName = variableName;
	}


	/**
	 * @return the defs
	 */
	public List<Integer> getDefs() {
		return defs;
	}
	/**
	 * @param defs the defs to set
	 */
	public void setDefs(List<Integer> defs) {
		this.defs = defs;
	}
	/**
	 * @return the cUses
	 */
	public List<Integer> getcUses() {
		return cUses;
	}
	/**
	 * @param cUses the cUses to set
	 */
	public void setcUses(List<Integer> cUses) {
		this.cUses = cUses;
	}
	/**
	 * @return the pUses
	 */
	public List<Integer> getpUses() {
		return pUses;
	}
	/**
	 * @param pUses the pUses to set
	 */
	public void setpUses(List<Integer> pUses) {
		this.pUses = pUses;
	}
}
