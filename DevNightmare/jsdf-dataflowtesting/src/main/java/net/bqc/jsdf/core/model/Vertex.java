package net.bqc.jsdf.core.model;

import net.bqc.jsdf.core.helper.IdGenerator;
import org.mozilla.javascript.ast.AstNode;

import java.util.*;

public class Vertex {

    public enum Type {
        IF_STATEMENT, ENTRY, EXIT, VARIABLE_DECLARATION, EXPRESSION_STATEMENT, RETURN_STATEMENT,
        WHILE_LOOP
    }

    public enum DFType {

    }

    protected final int id = IdGenerator.generateVertexId();
    protected AstNode astNode;
    protected Vertex parent;
    protected Type type;
    protected List<Vertex> targets = new ArrayList<>();

    protected Set<Variable> p_uses = new HashSet<>();
    protected Set<Variable> c_uses = new HashSet<>();
    protected Set<Variable> defs = new HashSet<>();

    public Vertex() {
    }

    public Vertex(AstNode astNode) {
        this.astNode = astNode;
    }

    public Vertex(AstNode astNode, Type type) {
        this.astNode = astNode;
        this.type = type;
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

    public int getId() {
        return id;
    }

    public void addTarget(Vertex vertex) {
        targets.add(vertex);
    }

    public List<Vertex> getTargets() {
        return targets;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Vertex)) return false;
        return ((Vertex) obj).id == this.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Set<Variable> getP_uses() {
        return p_uses;
    }

    public Set<Variable> getC_uses() {
        return c_uses;
    }

    public Set<Variable> getDefs() {
        return defs;
    }

    public void addP_uses(Variable variable) {
        this.p_uses.add(variable);
    }

    public void addC_uses(Variable variable) {
        this.c_uses.add(variable);
    }

    public void addDefs(Variable variable) {
        this.defs.add(variable);
    }
}
