package net.bqc.jsdf.core;

import net.bqc.jsdf.core.helper.JsParsingHelper;
import org.junit.Test;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.FunctionNode;

import java.io.IOException;

public class TestCDFGenerator {

    @Test
    public void testWorking() throws IOException {
        AstRoot astRoot = JsParsingHelper.getInstance().parse("src/test/resources/test.js");
        astRoot.visit(astNode -> {
            if (astNode instanceof FunctionNode) {
                System.out.println("\n================================");
                System.out.println("Function: " + ((FunctionNode) astNode).getFunctionName().toSource());
                System.out.println("================================");
                CDFGenerator cdfGenerator = new CDFGenerator((FunctionNode) astNode);
                System.out.println("================================");
            }
            return true;
        });
    }
}
