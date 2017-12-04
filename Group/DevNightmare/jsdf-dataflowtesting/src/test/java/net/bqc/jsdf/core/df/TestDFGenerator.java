package net.bqc.jsdf.core.df;

import net.bqc.jsdf.core.cf.CFGenerator;
import net.bqc.jsdf.core.helper.JsParsingHelper;
import org.junit.Test;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.FunctionNode;

import java.io.IOException;

public class TestDFGenerator {

    @Test
    public void testWorking() throws IOException {
        AstRoot astRoot = JsParsingHelper.getInstance().parse("src/test/resources/test.js");
        astRoot.visit(astNode -> {
            if (astNode instanceof FunctionNode) {
                CFGenerator cfGenerator = new CFGenerator((FunctionNode) astNode);
                DFGenerator dfGenerator = new DFGenerator(cfGenerator.getGraph(), cfGenerator.getGraphPaths());
            }
            return true;
        });
    }
}
