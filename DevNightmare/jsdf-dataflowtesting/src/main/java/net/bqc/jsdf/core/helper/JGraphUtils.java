package net.bqc.jsdf.core.helper;

import net.bqc.jsdf.core.model.Edge;
import net.bqc.jsdf.core.model.Vertex;
import org.jgrapht.Graph;

public class JGraphUtils {

    public static void printGraph(Graph<Vertex, Edge> g) {
        for (Edge e : g.edgeSet()) {
            Vertex source = g.getEdgeSource(e);
            Vertex target = g.getEdgeTarget(e);

            System.out.println(
                    source.getId() + ": " + getVertexLabel(source) + "\n===>\n" +
                    target.getId() + ": " + getVertexLabel(target));

            System.out.println("-----------------------");
        }
    }

    public static String getVertexLabel(Vertex vertex) {
        return vertex.getAstNode() == null ? vertex.getType().toString() : vertex.getAstNode().toSource().trim();
    }

    public static void printFlow(Vertex vertex) {
        if (vertex != null) {
            System.out.println(vertex.getId() + ": " + getVertexLabel(vertex));
            vertex.getTargets().forEach(nextVertex -> {
                System.out.println("==>");
                System.out.println(nextVertex.getId() + ": " + getVertexLabel(nextVertex));
            });
            System.out.println("-----------------------");
            vertex.getTargets().forEach(nextVertex -> {
                printFlow(nextVertex);
            });
        }
    }
}
