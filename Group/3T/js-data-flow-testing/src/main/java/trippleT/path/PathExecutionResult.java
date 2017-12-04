package trippleT.path;

import java.util.List;

import trippleT.solver.result.DefineFun;
import trippleT.solver.result.InputPathResult;

public class PathExecutionResult {
	public static int POSSIBLE_PATH = 1;
	public static int IMPOSSIBLE_PATH = 0;
	
	private int status;
	private List<Integer> path;
	private List<DefineFun> inputs;
	private List<String> pathConstraints;
	
	public PathExecutionResult() {
		
	}
	
	public PathExecutionResult(List<Integer> path, List<String> pathConstraints, InputPathResult inputPathResult) {
		this.inputs = inputPathResult.getInputs();
		this.status = inputPathResult.getStatus();
		this.path = path;
		this.pathConstraints = pathConstraints;
	}

	/**
	 * @return the status
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * @return the path
	 */
	public List<Integer> getPath() {
		return path;
	}

	/**
	 * @param path the path to set
	 */
	public void setPath(List<Integer> path) {
		this.path = path;
	}

	/**
	 * @return the inputs
	 */
	public List<DefineFun> getInputs() {
		return inputs;
	}

	/**
	 * @param inputs the inputs to set
	 */
	public void setInputs(List<DefineFun> inputs) {
		this.inputs = inputs;
	}
	
	
	/**
	 * @return the pathConstraints
	 */
	public List<String> getPathConstraints() {
		return pathConstraints;
	}

	/**
	 * @param pathConstraints the pathConstraints to set
	 */
	public void setPathConstraints(List<String> pathConstraints) {
		this.pathConstraints = pathConstraints;
	}

	public void print() {
		if (status == POSSIBLE_PATH) {
			if (inputs != null) {
				System.out.println("Possible path: " + path);
				System.out.println("path constraints: " + pathConstraints);
				for (DefineFun param: inputs) {
					System.out.println(param);
				}
			}
		} else {
			System.out.println("Impossible path: " + path);
			System.out.println("path constraints: " + pathConstraints);
		}
	}
}
