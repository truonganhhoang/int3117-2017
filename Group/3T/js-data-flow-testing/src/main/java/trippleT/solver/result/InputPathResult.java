package trippleT.solver.result;

import java.util.List;

public class InputPathResult {
	public static final int POSSIBLE_PATH = 1;
	public static final int IMPOSSIBLE_PATH = 0;
	
	private int status;
	private List<DefineFun> inputs;
	private List<String> errors;
	
	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}
	
	
	/**
	 * @param status the status to set
	 */
	public void setStatus(String SMTStatus) {
		if ("sat".equals(SMTStatus)) {
			status = POSSIBLE_PATH;
		}
		else if ("unsat".equals(SMTStatus)) {
			status = IMPOSSIBLE_PATH;
		}
		else {
			status = IMPOSSIBLE_PATH;
		}
	}
	
	/**
	 * @return the errors
	 */
	public List<String> getErrors() {
		return errors;
	}
	
	/**
	 * @param errors the errors to set
	 */
	public void setErrors(List<String> errors) {
		this.errors = errors;
	}

	/**
	 * @return the inputs
	 */
	public List<DefineFun> getInputs() {
		return inputs;
	}

	/**
	 * @param parameters the inputs to set
	 */
	public void setInputs(List<DefineFun> inputs) {
		this.inputs = inputs;
	}
	
	public String getInputsStr() {
		String result = "";
		if (inputs != null) {
			for (DefineFun param: inputs) {
				result += param.getExpression() + " ";
			}
		}
		
		return result;
	}

	public void print() {
		if (status == POSSIBLE_PATH) {
			if (inputs != null) {
				for (DefineFun param: inputs) {
					System.out.println(param);
				}
			}
		} else {
			System.out.println("Impossible path");
		}
	}
}
