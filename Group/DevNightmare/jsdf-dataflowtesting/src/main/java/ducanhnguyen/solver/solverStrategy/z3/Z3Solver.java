package ducanhnguyen.solver.solverStrategy.z3;

import java.util.ArrayList;

import ducanhnguyen.solver.main.Utils1;
import ducanhnguyen.solver.solverStrategy.ISolver;
import ducanhnguyen.solver.standardStrategy.SMTLIB.CreateSufficientSmtLib;
import ducanhnguyen.solver.time.Timer;

public class Z3Solver extends Z3Configuration implements ISolver {

    private ArrayList<String> testcase;
    private ArrayList<String> equationList;
    private String solution = "";
    private int solvingTime = 0;//ms

    public Z3Solver(ArrayList<String> testcase, ArrayList<String> equationList) {
        this.testcase = testcase;
        this.equationList = equationList;
        solve();
    }

    @Override
    public void solve() {
        try {
            String formula = new CreateSufficientSmtLib(testcase, equationList).getOutput();
//            System.out.println(formula);
            Utils1.writeToFile(Smt_Lib_path_file + smtFileName, formula);

            Timer timer = new Timer();
            timer.start();
            RunZ3OnCMD r = new RunZ3OnCMD(Smt_Lib_path_lib, Smt_Lib_path_file + smtFileName);
            timer.end();

            solvingTime = timer.getRunningTime();

            solution = r.getOutput();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getSolution() {
        return solution;
    }

    @Override
    public int getSolvingTime() {
        return solvingTime;
    }
}
