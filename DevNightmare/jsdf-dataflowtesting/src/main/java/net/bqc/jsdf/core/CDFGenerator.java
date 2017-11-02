package net.bqc.jsdf.core;

import org.jgrapht.DirectedGraph;
import org.jgrapht.graph.DefaultDirectedGraph;
import org.jgrapht.graph.DefaultEdge;
import org.mozilla.javascript.ast.AstNode;

/**
 * Input: AstNode indicate for method
 * Output: A full control flow graph of method statements
 */
public class CDFGenerator {

    DirectedGraph<AstNode, DefaultEdge> cfg =
            new DefaultDirectedGraph<>(DefaultEdge.class);

    public CDFGenerator(AstNode astNode) {
        generate(astNode);
    }

    private void generate(AstNode astNode) {
        astNode.visit(node -> {
            return true;
        });
    }


}
