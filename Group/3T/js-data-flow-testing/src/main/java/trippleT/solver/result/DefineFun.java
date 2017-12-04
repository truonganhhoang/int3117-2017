package trippleT.solver.result;

public class DefineFun {
	private String name;
	private String value;
	
	public DefineFun() {
		
	}
	
	public DefineFun(String name, String value) {
		this.name = name;
		this.value = value;
	}
	
	
	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}
	
	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}
	
	/**
	 * @return the value
	 */
	public String getValue() {
		return value;
	}
	
	/**
	 * @param value the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}
	
	public String getExpression() {
		return name + " = " + value;
	}
	
	@Override
	public String toString() {
		return name + " = " + value;
	}
}
