package ducanhnguyen.solver.main;

import java.util.ArrayList;

import ducanhnguyen.solver.solverStrategy.ISolver;
import ducanhnguyen.solver.solutionStandardStrategy.IStandardStrategy;
import ducanhnguyen.solver.solutionStandardStrategy.Z3StandardStrategy;
import ducanhnguyen.solver.solverStrategy.z3.Z3Configuration;
import ducanhnguyen.solver.solverStrategy.z3.Z3Solver;

public class SolutionGenerator {

    private String solution = "";
    private int solvingTime = 0;

    public static String solve(ArrayList<String> testcases, ArrayList<String> constraints) throws Exception {
        /**Step 1: Input*/ 
/*    	ArrayList<String> testcases = new ArrayList<>();
        testcases.add("int a");
        testcases.add("int b");
        testcases.add("int c");

        ArrayList<String> constraints = new ArrayList<>();
        constraints.add("a==c");
        constraints.add("a>b+2");
        constraints.add("!(a<6)&&(b>0)");*/

        /**Step 2: Config Z3*/
        Z3Configuration.Smt_Lib_path_file="E:\\";// duong dan luu cac thong tin tam thoi trong qua trinh solve
        Z3Configuration.Smt_Lib_path_lib = "E:\\Z3\\z3-4.5.0-x64-win\\bin\\z3.exe";// duong dan den thu vien z3.exe
        
        /**Step 3: Solve*/
        SolutionGenerator gen = new SolutionGenerator();
        gen.setSolverStrategy(new Z3Solver(testcases, constraints));
        gen.setSolutionStandardStrategy(new Z3StandardStrategy(gen.getOutput()));
//        System.out.println("Z3: Normalize solution: " + gen.getOutput());
        return gen.getOutput();
   }

    public SolutionGenerator() throws Exception {
    }

    public void setSolverStrategy(ISolver solver) {
        solution = solver.getSolution();
        solvingTime = solver.getSolvingTime();
    }

    public void setSolutionStandardStrategy(IStandardStrategy standardStrategy) {
        solution = standardStrategy.getNormalizeSolution();
    }

    public String getOutput() {
        return solution;
    }

    public int getSolvingTime() {
        return solvingTime;
    }
}
