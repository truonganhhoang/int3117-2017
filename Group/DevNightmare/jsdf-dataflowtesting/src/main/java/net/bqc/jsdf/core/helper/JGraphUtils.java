package net.bqc.jsdf.core.helper;

import net.bqc.jsdf.core.model.Edge;
import net.bqc.jsdf.core.model.Vertex;
import org.jgrapht.Graph;
import org.jgrapht.GraphPath;

import java.util.List;

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


    public static void printGraphWithVertexType(Graph<Vertex, Edge> g) {
        g.vertexSet().forEach(vertex -> {
            System.out.println(
                    vertex.getId() + ": " + getVertexLabel(vertex) + "\n===>" +
                    "\ndefs: " + vertex.getDefs() +
                    "\np-uses: " + vertex.getP_uses() +
                    "\nc-uses: " + vertex.getC_uses()
            );
            System.out.println("-----------------------");
        });
    }

    public static String getVertexLabel(Vertex vertex) {
        return vertex.getAstNode() == null || vertex.getType() == Vertex.Type.ENTRY
                ? vertex.getType().toString() : vertex.getAstNode().toSource().trim();
    }

    public static void printPaths(List<GraphPath> graphPaths) {
        graphPaths.forEach(path -> {
            System.out.println("Path: " + path);
            printPath(path);
            System.out.println("-----------------------");
        });
    }

    public static void printPath(GraphPath graphPath) {
        graphPath.getVertexList().forEach(o -> {
            Vertex vertex = (Vertex) o;
            System.out.println(vertex.getId() + ": " + getVertexLabel(vertex));
        });
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
