package net.bqc.jsdf.core.model;

import org.mozilla.javascript.ast.AstNode;

public class Vertex {

    public enum Type {
        IF_STATEMENT, ENTRY, EXIT
    }

    protected AstNode astNode;
    protected Vertex parent;
    protected Type type;

    public Vertex() {

    }

    public Vertex(AstNode astNode) {
        this.astNode = astNode;
    }

    public AstNode getAstNode() {
        return astNode;
    }

    public void setAstNode(AstNode astNode) {
        this.astNode = astNode;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public Vertex getParent() {
        return parent;
    }

    public void setParent(Vertex parent) {
        this.parent = parent;
    }
}
