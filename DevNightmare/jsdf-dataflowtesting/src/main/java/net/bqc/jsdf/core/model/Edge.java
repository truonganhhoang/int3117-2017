package net.bqc.jsdf.core.model;

public class Edge {

    public enum Type {
        POSITIVE, NEGATIVE
    }

    private Type type;

    public Edge() {
        this(Type.POSITIVE);
    }

    public Edge(Type type) {
        this.type = type;
    }

    public Type getType() {
        return type;
    }
}
