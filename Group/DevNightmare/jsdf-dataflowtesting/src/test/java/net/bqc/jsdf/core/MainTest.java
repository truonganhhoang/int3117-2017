package net.bqc.jsdf.core;

import net.bqc.jsdf.core.cf.CFGenerator;
import net.bqc.jsdf.core.df.DFGenerator;
import net.bqc.jsdf.core.helper.JsParsingHelper;
import org.junit.Test;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.FunctionNode;

import java.io.IOException;

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

    }
}
