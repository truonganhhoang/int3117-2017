package net.bqc.jsdf.core;

import ducanhnguyen.solver.main.SolutionGenerator;
import net.bqc.jsdf.core.cf.CFGenerator;
import net.bqc.jsdf.core.df.DFGenerator;
import net.bqc.jsdf.core.helper.JGraphUtils;
import net.bqc.jsdf.core.helper.JsParsingHelper;
import net.bqc.jsdf.core.symbolicexecution.SymbolicExecutor;
import org.jgrapht.GraphPath;
import org.junit.Test;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.FunctionNode;

import java.io.IOException;
import java.util.List;

public class MainTest {

    @Test
    public void test() throws IOException {
        AstRoot astRoot = JsParsingHelper.getInstance().parse("src/test/resources/test.js");
        astRoot.visit(astNode -> {
            if (astNode instanceof FunctionNode) {
                run((FunctionNode) astNode);
            }
            return true;
        });
    }

    public void run(FunctionNode functionNode) {
        CFGenerator cfGenerator = new CFGenerator(functionNode);
        DFGenerator dfGenerator = new DFGenerator(cfGenerator.getGraph(), cfGenerator.getGraphPaths());

        // all path coverage :D
        List<GraphPath> graphPaths = dfGenerator.getGraphPaths();
        graphPaths.forEach(graphPath -> {
            try {
                SymbolicExecutor symbolicExecutor = new SymbolicExecutor(graphPath);
                String solution = SolutionGenerator.solve(symbolicExecutor.getTestCases(), symbolicExecutor.getConstraints());
                System.out.println("Path:");
                JGraphUtils.printPath(graphPath);
                System.out.println("\n==> Solution: " + solution);
                System.out.println("-----------------------");
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
