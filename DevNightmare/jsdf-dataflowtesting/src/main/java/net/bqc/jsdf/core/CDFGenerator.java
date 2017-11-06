package net.bqc.jsdf.core;

import net.bqc.jsdf.core.ast.CdfNodeVisitor;
import net.bqc.jsdf.core.helper.JGraphUtils;
import net.bqc.jsdf.core.model.*;
import org.jgrapht.DirectedGraph;
import org.jgrapht.graph.DefaultDirectedGraph;
import org.mozilla.javascript.Node;
import org.mozilla.javascript.ast.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

/**
 * Input: FunctionNode indicate for a function
 * Output: A full control flow graph of the function
 */
public class CDFGenerator {

    private DirectedGraph<Vertex, Edge> cfg =
            new DefaultDirectedGraph<>(Edge.class);

    private Stack<Vertex> vertexStack = new Stack<>();

    public CDFGenerator(FunctionNode functionNode) {
        generate(functionNode);
    }

    private void generate(FunctionNode functionNode) {
        // create entry vertex
        Vertex entryVertex = new EntryVertex();
        cfg.addVertex(entryVertex);

        functionNode.getBody().visit(new CdfNodeVisitor(entryVertex));

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
            }
        }
        /**********************************************
         * EXPRESSION STATEMENT, VARIABLE DECLARATION
         **********************************************/
        else if (vertex.getType() == Vertex.Type.VARIABLE_DECLARATION || vertex.getType() == Vertex.Type.EXPRESSION_STATEMENT) {
            if (vertex.getTargets().size() > 0) {
                Edge edge = new Edge();
                cfg.addEdge(vertex, vertex.getTargets().get(0), edge);
            }
            else if (linkVertex != null) {
                Edge edge = new Edge();
                cfg.addEdge(vertex, linkVertex, edge);
            }
        }
        /**********************************************
         * IF-STATEMENT
         **********************************************/
        else if (vertex.getType() == Vertex.Type.IF_STATEMENT) {
            List<Vertex> targets = vertex.getTargets();
            Vertex successorVertex = targets.get(targets.size() - 1);

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
                if (linkVertex != null) {
                    Edge edge = new Edge();
                    cfg.addEdge(vertex, linkVertex, edge);
                }
            }

            if (targets.size() >= 2) { // then-part and next statement
                // link if-statement to then-part
                Vertex thenVertex = targets.get(0);
                Edge thenEdge = new Edge();
                cfg.addEdge(vertex, thenVertex, thenEdge);

                // link then-part to successor
                createEdges(thenVertex, successorVertex);
            }
        }
    }

    private void createVertices(Vertex vertex) {
        if (vertex != null) {
            cfg.addVertex(vertex);
            vertex.getTargets().forEach(nextVertex -> createVertices(nextVertex));
        }
    }

    private void traversal(AstNode node) {
        System.out.println(node.getClass().getName());
        System.out.println(node.toSource());
        System.out.println("==========================");

        // node wrapped by curly brackets {}
        if (node instanceof Block || node instanceof Scope) {
            traversalBlock(node);
        }
        else if (node instanceof IfStatement) {
            traversalIfStatement((IfStatement) node);
        }
        else {
            traversalOtherStatement(node);
        }
    }

    private void traversalIfStatement(IfStatement statement) {
        Vertex decisionVertex = new DecisionVertex(statement);
        cfg.addVertex(decisionVertex);

        AstNode thenPart = statement.getThenPart();
        AstNode elsePart = statement.getElsePart();

        if (thenPart != null) {
            System.out.println("Then: " + thenPart.toSource());
            traversal(thenPart);
        }

        if (elsePart != null) {
            System.out.println("Else: " + elsePart.toSource());
            traversal(elsePart);
        }
    }

    private void traversalOtherStatement(AstNode node) {
        Vertex statementVertex = new StatementVertex(node);
        cfg.addVertex(statementVertex);
    }

    private void traversalBlock(AstNode node) {
        List<AstNode> statements = getChildStatements(node);
        statements.forEach(statement -> traversal(statement));
    }

    private List<AstNode> getChildStatements(AstNode astNode) {
        List<AstNode> stmts = new ArrayList<>();
        Node n = astNode.getFirstChild();
        while (n != null) {
            stmts.add((AstNode)n);
            n = n.getNext();
        }
        return stmts;
    }

}

