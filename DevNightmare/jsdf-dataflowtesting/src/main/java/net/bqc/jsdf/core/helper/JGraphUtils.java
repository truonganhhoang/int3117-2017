package net.bqc.jsdf.core.helper;

import net.bqc.jsdf.core.model.Edge;
import net.bqc.jsdf.core.model.Vertex;
import org.jgrapht.Graph;

public class JGraphUtils {

    public static void printGraph(Graph<Vertex, Edge> g) {
        for (Edge e : g.edgeSet()) {
            Vertex source = g.getEdgeSource(e);
            Vertex target = g.getEdgeTarget(e);

            System.out.println(getVertexLabel(source) + " --> " + getVertexLabel(target));
        }
    }

    public static String getVertexLabel(Vertex vertex) {
        return vertex.getAstNode() == null ? vertex.getType().toString() : vertex.getAstNode().toSource().trim();
    }
}
