package net.bqc.jsdf.core.df;

import net.bqc.jsdf.core.helper.JGraphUtils;
import net.bqc.jsdf.core.model.DecisionVertex;
import net.bqc.jsdf.core.model.Edge;
import net.bqc.jsdf.core.model.Variable;
import net.bqc.jsdf.core.model.Vertex;
import org.jgrapht.DirectedGraph;
import org.jgrapht.GraphPath;
import org.mozilla.javascript.ast.*;


import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class DFGenerator {

    private DirectedGraph<Vertex, Edge> cfg;
    private List<GraphPath> graphPaths;
    private Set<Variable> variableSet;

    public DFGenerator(DirectedGraph<Vertex, Edge> cfg, List<GraphPath> graphPaths) {
        this.cfg = cfg;
        this.graphPaths = graphPaths;
        variableSet = new HashSet<>();
        generateVertexType();

//        JGraphUtils.printPaths(graphPaths);
    }

    private void generateVertexType() {
        Set<Vertex> vertexSet = cfg.vertexSet();
        vertexSet.forEach(vertex -> {
            AstNode vertexAstNode = vertex.getAstNode();
            if (vertexAstNode != null) {
                // p-use
                if (vertex instanceof DecisionVertex) {
                    if (vertexAstNode instanceof IfStatement) {
                        IfStatement ifStatement = (IfStatement) vertexAstNode;
                        AstNode condition = ifStatement.getCondition();
                        System.out.println("Condition: " + condition.toSource());
                        System.out.println(getVariableNamesInside(condition));
                    }
                    else if (vertexAstNode instanceof WhileLoop) {
                        WhileLoop whileLoop = (WhileLoop) vertexAstNode;
                        AstNode condition = whileLoop.getCondition();
                        System.out.println("Condition: " + condition.toSource());
                        System.out.println(getVariableNamesInside(condition));
                    }
                }
            }
        });
    }



    private Set<String> getVariableNamesInside(AstNode astNode) {
        NameVisitor nameVisitor = new NameVisitor();
        astNode.visit(nameVisitor);
        return nameVisitor.getVariableNames();
    }

    private class NameVisitor implements NodeVisitor {

        private Set<String> variableNames = new HashSet<>();

        @Override
        public boolean visit(AstNode astNode) {
            if (astNode instanceof Name) {
                variableNames.add(astNode.toSource().trim());
            }
            return true;
        }

        public Set<String> getVariableNames() {
            return variableNames;
        }
    }
}
