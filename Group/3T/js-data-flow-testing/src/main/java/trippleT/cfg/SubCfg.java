package trippleT.cfg;

public class SubCfg extends AbstractCfg {
	public SubCfg() {
		// todo
	}
	
	public SubCfg(CfgNode begin, CfgNode end) {
		this.begin = begin;
		this.end = end;
	}

	public SubCfg append(SubCfg other) {
		if(other.begin != null) {
			if (begin == null) {
				begin = other.begin;
				end = other.end;
			} else {
				end.next = other.begin;
				end = other.end;
			}
		}
		
		return this;
	}
	
	public SubCfg appendNode(CfgNode node) {
		if(node != null) {
			if (begin == null) {
				end = begin = node;
			} else {
				end.next = node;
				end = node;
			}
		}
		
		return this;
	}
}
