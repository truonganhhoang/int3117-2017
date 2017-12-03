package net.bqc.jsdf.core.helper;

public class IdGenerator {

    private static Integer vertexId = 1;

    public static Integer generateVertexId() {
        return vertexId++;
    }
}
