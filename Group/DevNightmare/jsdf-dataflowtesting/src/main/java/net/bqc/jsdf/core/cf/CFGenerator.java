package net.bqc.jsdf.core.cf;

import net.bqc.jsdf.core.ast.CFNodeVisitor;
import net.bqc.jsdf.core.helper.JGraphUtils;
import net.bqc.jsdf.core.model.*;
import org.jgrapht.DirectedGraph;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.shortestpath.AllDirectedPaths;
import org.jgrapht.graph.DefaultDirectedGraph;
import org.mozilla.javascript.ast.*;

import java.util.List;

/**
 * Data flow generator
 * Input: FunctionNode indicate for a function
 * Output: A full control flow graph of the function
 */
public class CFGenerator {

    private DirectedGraph<Vertex, Edge> cfg =
            new DefaultDirectedGraph<>(Edge.class);

    private Vertex entryVertex = new EntryVertex();
    private Vertex exitVertex = new ExitVertex();

    public CFGenerator(FunctionNode functionNode) {
        generate(functionNode);
    }

    private void generate(FunctionNode functionNode) {
        // create entry vertex
        cfg.addVertex(entryVertex);
        entryVertex.setAstNode(functionNode);
        cfg.addVertex(exitVertex);

        functionNode.getBody().visit(new CFNodeVisitor(entryVertex));

        buildCfg(entryVertex);

//        JGraphUtils.printFlow(entryVertex);
//        traversal(functionNode.getBody());
//        JGraphUtils.printGraph(cfg);
    }

    private void buildCfg(Vertex entryVertex) {
        createVertices(entryVertex);
        createEdges(entryVertex, null);
    }

    private void createEdges(Vertex vertex, Vertex linkVertex) {
        if (vertex.getType() == Vertex.Type.ENTRY) {
            if (vertex.getTargets().size() > 0) {
                Edge edge = new Edge();
                cfg.addEdge(vertex, vertex.getTargets().get(0), edge);

                // next vertex
                createEdges(vertex.getTargets().get(0), linkVertex);
            }
            else {
                Edge edge = new Edge();
                cfg.addEdge(vertex, exitVertex, edge);
            }
        }
        /**********************************************
         * EXPRESSION STATEMENT, VARIABLE DECLARATION
         **********************************************/
        else if (vertex.getType() == Vertex.Type.VARIABLE_DECLARATION || vertex.getType() == Vertex.Type.EXPRESSION_STATEMENT) {
            if (vertex.getTargets().size() > 0) {
                Edge edge = new Edge();
                cfg.addEdge(vertex, vertex.getTargets().get(0), edge);

                // next vertex
                createEdges(vertex.getTargets().get(0), linkVertex);
            }
            else {
                Vertex successor = linkVertex != null ? linkVertex : exitVertex;
                Edge edge = new Edge();
                cfg.addEdge(vertex, successor, edge);
            }
        }
        /**********************************************
         * RETURN STATEMENT
         **********************************************/
        else if (vertex.getType() == Vertex.Type.RETURN_STATEMENT) {
            // link return-statement to exit vertex
            Edge edge = new Edge();
            cfg.addEdge(vertex, exitVertex, edge);
        }
        /**********************************************
         * IF-STATEMENT
         **********************************************/
        else if (vertex.getType() == Vertex.Type.IF_STATEMENT) {
            List<Vertex> targets = vertex.getTargets();
            Vertex successorVertex = targets.size() > 0 ? targets.get(targets.size() - 1) : null;

            if (targets.size() >= 3) { // then-part and else-part and next statement
                // link if-statement to else-part
                Vertex elseVertex = targets.get(1);
                Edge elseEdge = new Edge(Edge.Type.NEGATIVE);
                cfg.addEdge(vertex, elseVertex, elseEdge);

                // link else-part to successor
                createEdges(elseVertex, successorVertex);
            }
            else if (targets.size() >= 1) {
                Edge.Type edgeType = targets.size() == 2 ? Edge.Type.NEGATIVE : Edge.Type.POSITIVE;
                // link if-statement to successor
                Edge ifToSuccessorEdge = new Edge(edgeType);
                cfg.addEdge(vertex, successorVertex, ifToSuccessorEdge);
            }
            else if (targets.size() == 0) {
                // link if-statement to parent successor
                successorVertex = linkVertex != null ? linkVertex : exitVertex;
                Edge edge = new Edge();
                cfg.addEdge(vertex, successorVertex, edge);
            }

            if (targets.size() >= 2) { // then-part and next statement
                // link if-statement to then-part
                Vertex thenVertex = targets.get(0);
                Edge thenEdge = new Edge();
                cfg.addEdge(vertex, thenVertex, thenEdge);

                // link then-part to successor
                createEdges(thenVertex, successorVertex);
            }

            // next vertex
            createEdges(successorVertex, linkVertex);
        }
        /**********************************************
         * WHILE LOOP
         **********************************************/
        else if (vertex.getType() == Vertex.Type.WHILE_LOOP) {
            List<Vertex> targets = vertex.getTargets();
            Vertex successorVertex = targets.size() > 0 ? targets.get(targets.size() - 1) : null;

            if (targets.size() >= 2) {
                Vertex whileBody = targets.get(0);
                // link while-statement with while body-part
                cfg.addEdge(vertex, whileBody, new Edge());
                // link while body-part with successor
                createEdges(whileBody, successorVertex);
            }

            if (targets.size() >= 1) {
                Edge.Type edgeType = targets.size() == 2 ? Edge.Type.NEGATIVE : Edge.Type.POSITIVE;
                // link while-statement with successor
                cfg.addEdge(vertex, successorVertex, new Edge(edgeType));
            }
            else if (targets.size() == 0) {
                // link while-statement to parent successor or exit vertex
                successorVertex = linkVertex != null ? linkVertex : exitVertex;
                cfg.addEdge(vertex, successorVertex, new Edge());
            }

            // next vertex
            createEdges(successorVertex, linkVertex);
        }
    }

    private void createVertices(Vertex vertex) {
        if (vertex != null) {
            cfg.addVertex(vertex);
            vertex.getTargets().forEach(nextVertex -> createVertices(nextVertex));
        }
    }

    public DirectedGraph<Vertex, Edge> getGraph() {
        return cfg;
    }

    /**
     * Generate all possible paths which start from Entry vertex to Exit vertex
     * @return list of paths
     */
    public List<GraphPath> getGraphPaths() {
        AllDirectedPaths directedPaths = new AllDirectedPaths(cfg);
        List<GraphPath> graphPaths = directedPaths.getAllPaths(entryVertex, exitVertex, true, null);
        return graphPaths;
    }
}

