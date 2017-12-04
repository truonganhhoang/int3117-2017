package net.bqc.jsdf.core.model;

import org.mozilla.javascript.ast.AstNode;

public class DecisionVertex extends Vertex {

    public DecisionVertex(AstNode astNode) {
        super(astNode);
    }

    public DecisionVertex(AstNode astNode, Type type) {
        super(astNode, type);
    }
}
