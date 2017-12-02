package net.bqc.jsdf.core.helper;

import org.junit.Test;
import static org.junit.Assert.*;
import org.mozilla.javascript.ast.AstRoot;
import org.mozilla.javascript.ast.FunctionNode;

import java.io.IOException;
import java.util.ArrayList;

public class TestJsParsingHelper {

    @Test
    public void testWorking() throws IOException {
        AstRoot astRoot = JsParsingHelper.getInstance().parse("src/test/resources/check_leap_year.js");
        ArrayList<FunctionNode> functionNodes = new ArrayList<>();

        astRoot.visit(astNode -> {
            if (astNode instanceof FunctionNode) {
                functionNodes.add((FunctionNode) astNode);
            }
            return true;
        });

        assertEquals(functionNodes.get(0).getName(), "max");
        assertEquals(functionNodes.get(1).getName(), "max2");
    }
}
