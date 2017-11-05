package net.bqc.jsdf.core.model;

import org.mozilla.javascript.ast.AstNode;

public class StatementVertex extends Vertex {

    public StatementVertex(AstNode astNode) {
        super(astNode);
    }

    public StatementVertex(AstNode astNode, Type type) {
        super(astNode, type);
    }
}
