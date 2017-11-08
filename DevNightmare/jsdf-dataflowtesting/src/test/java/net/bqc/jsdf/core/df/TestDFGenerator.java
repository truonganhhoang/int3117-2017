package net.bqc.jsdf.core.df;

import net.bqc.jsdf.core.CDFGenerator;
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
                CDFGenerator cdfGenerator = new CDFGenerator((FunctionNode) astNode);
                DFGenerator dfGenerator = new DFGenerator(cdfGenerator.getGraph(), cdfGenerator.getGraphPaths());
            }
            return true;
        });
    }
}
