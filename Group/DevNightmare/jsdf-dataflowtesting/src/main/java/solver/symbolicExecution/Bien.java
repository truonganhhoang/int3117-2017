package solver.symbolicExecution;

class Bien {
	private String name;
	private int type;
	private String value;

	@Override
	public boolean equals(Object b) {
		Bien tmp = (Bien) b;
		if (tmp.name.equals(name) && tmp.type == type)
			return true;
		return false;
	}

	protected Bien(String name, int type, String value) {
		this.name = name;
		this.type = type;
		this.value = value;
	}

	protected Bien(String name, int type) {
		this.name = name;
		this.type = type;
	}

	protected void setValue(String value) {
		this.value = value;
	}

	protected String getName() {
		return name;
	}

	protected int getType() {
		return type;
	}

	protected String getValue() {
		return value;
	}

	@Override
	public String toString() {
		return name + "=" + value;
	}

	protected static final int DOUBLE = 0;
	protected static final int INT = 1;
	protected static final int INT_ARRAY_ONE_DIMENSION = 2;
	protected static final int DOUBLE_ARRAY_ONE_DIMENSION = 3;
	protected static final int INT_ARRAY_TWO_DIMENSION = 4;
	protected static final int DOUBLE_ARRAY_TWO_DIMENSION = 5;
}
