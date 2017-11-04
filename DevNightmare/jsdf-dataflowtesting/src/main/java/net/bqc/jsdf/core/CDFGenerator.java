package net.bqc.jsdf.core;

import net.bqc.jsdf.core.helper.JGraphUtils;
import net.bqc.jsdf.core.model.Edge;
import net.bqc.jsdf.core.model.EntryVertex;
import net.bqc.jsdf.core.model.StatementVertex;
import net.bqc.jsdf.core.model.Vertex;
import org.jgrapht.DirectedGraph;
import org.jgrapht.graph.DefaultDirectedGraph;
import org.jgrapht.graph.DefaultEdge;
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
        vertexStack.push(entryVertex);

        traversal(functionNode.getBody());

        JGraphUtils.printGraph(cfg);
    }

    /**
     * Traversal all statements to create vertices for cfg
     * @param parent
     */
    private void traversal(AstNode parent) {
        List<AstNode> statements = new ArrayList<>();

        // node wrapped by curly brackets {}
        if (parent instanceof Block || parent instanceof Scope) {
             statements.addAll(getStatements(parent));
        }
        else { // just a simple node
            statements.add(parent);
        }

        statements.forEach(statement -> {
            if (statement instanceof IfStatement) {
                System.out.println(statement.getClass().getName());
                System.out.println(statement.toSource());

                AstNode thenBlock = ((IfStatement) statement).getThenPart();
                System.out.println("==========================");
                traversal(thenBlock);
            }
            else {
                Vertex previousVertex = vertexStack.peek();
                Vertex statementVertex = new StatementVertex(statement);
                cfg.addVertex(statementVertex);

                // link two vertex
                Edge edge = new Edge();
                cfg.addEdge(previousVertex, statementVertex, edge);

                // push new vertex to stack
                vertexStack.push(statementVertex);

                System.out.println(statement.getClass().getName());
                System.out.println(statement.toSource());
                System.out.println("==========================");
            }
        });
    }

    private List<AstNode> getStatements(AstNode astNode) {
        List<AstNode> stmts = new ArrayList<>();
        Node n = astNode.getFirstChild();
        while (n != null) {
            stmts.add((AstNode)n);
            n = n.getNext();
        }
        return stmts;
    }

}

