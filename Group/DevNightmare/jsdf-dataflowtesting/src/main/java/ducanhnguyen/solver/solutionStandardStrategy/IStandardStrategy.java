package ducanhnguyen.solver.solutionStandardStrategy;

/**
 * This interface is used to normalize the solution which is output of
 * SMT-Solver like Z3, SMT-Interpol, etc.
 * 
 * @author DucAnh
 *
 */
public interface IStandardStrategy {
	/**
	 * 
	 * @param solution
	 *            The solution is expressed in the way which depends on
	 *            SMT-Solver
	 * @return
	 */
	public void normalize();
	public String getNormalizeSolution();
}
