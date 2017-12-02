package ducanhnguyen.solver.solverStrategy;

/**
 * This interface is used to solve the normalized expression
 *
 * @author DucAnh
 *
 */
public interface ISolver{

    public String getSolution();

    public void solve();
    
    public int getSolvingTime();
}
