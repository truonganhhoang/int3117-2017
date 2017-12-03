package net.bqc.jsdf.core.symbolicexecution;

import org.jgrapht.GraphPath;

import java.util.ArrayList;

public class SymbolicExecutor {

    private GraphPath constrainPath;
    private ArrayList<String> testCases;
    private ArrayList<String> constraints;

    public SymbolicExecutor(GraphPath constraintPath) {
        this.constrainPath = constraintPath;
        this.testCases = new ArrayList<>();
        this.constraints = new ArrayList<>();
    }

    public ArrayList<String> getTestCases() {
        return testCases;
    }

    public ArrayList<String> getConstraints() {
        return constraints;
    }
}
