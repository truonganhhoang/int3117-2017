package trippleT.cfg;

import java.util.HashMap;
import java.util.Map;

public class DefUseStore {
	private Map<String, DefUse> defUses = new HashMap<String, DefUse>();
	
	public void addDef(String variableName, int nodeIndex) {
		DefUse defUse = defUses.get(variableName);
		if (defUse != null) {
			defUse.addCUse(nodeIndex);
		} else {
			defUse = new DefUse(variableName);
			defUse.addCUse(nodeIndex);
			defUses.put(variableName, defUse);
		}
	}
	
	public void addCUses(String variableName, int nodeIndex) {
		DefUse defUse = defUses.get(variableName);
		if (defUse != null) {
			defUse.addDef(nodeIndex);
		} else {
			defUse = new DefUse(variableName);
			defUse.addDef(nodeIndex);
			defUses.put(variableName, defUse);
		}
	}
	
	public void addPUses(String variableName, int nodeIndex) {
		DefUse defUse = defUses.get(variableName);
		if (defUse != null) {
			defUse.addPUse(nodeIndex);
		} else {
			defUse = new DefUse(variableName);
			defUse.addPUse(nodeIndex);
			defUses.put(variableName, defUse);
		}
	}

	/**
	 * @return the defUses
	 */
	public Map<String, DefUse> getDefUses() {
		return defUses;
	}

	/**
	 * @param defUses the defUses to set
	 */
	public void setDefUses(Map<String, DefUse> defUses) {
		this.defUses = defUses;
	}
}
