package net.bqc.jsdf.core.df;

import net.bqc.jsdf.core.helper.JGraphUtils;
import net.bqc.jsdf.core.model.*;
import org.jgrapht.DirectedGraph;
import org.jgrapht.GraphPath;
import org.mozilla.javascript.ast.*;


import java.util.*;

public class DFGenerator {

    private DirectedGraph<Vertex, Edge> cfg;
    private List<GraphPath> graphPaths;
    private Map<String, Variable> variableMap;

    public DFGenerator(DirectedGraph<Vertex, Edge> cfg, List<GraphPath> graphPaths) {
        this.cfg = cfg;
        this.graphPaths = graphPaths;
        variableMap = new HashMap<>();

        generateEntryVertexType();
        generateVertexType();

//        System.out.println(variableMap.keySet());
//        JGraphUtils.printGraphWithVertexType(cfg);
//        JGraphUtils.printPaths(graphPaths);
    }

    /**
     * Add all parameter as def for Entry vertex
     */
    private void generateEntryVertexType() {
        Vertex entryVertex = cfg.vertexSet().stream()
                .filter(vertex -> vertex.getType() == Vertex.Type.ENTRY)
                .findFirst().orElse(null);
        if (entryVertex == null) return;

        AstNode functionNode = entryVertex.getAstNode();
        if (functionNode instanceof FunctionNode) {
            List<AstNode> parameters = ((FunctionNode) functionNode).getParams();
            parameters.forEach(astNode -> addDefs(getVariableNamesInside(astNode), entryVertex));
        }
    }

    /**
     * Get variables and find out which vertices are def, use of them
     */
    private void generateVertexType() {
        Set<Vertex> vertexSet = cfg.vertexSet();
        vertexSet.forEach(vertex -> {
            AstNode vertexAstNode = vertex.getAstNode();
            if (vertexAstNode != null) {
                // p-use
                if (vertex instanceof DecisionVertex) {
                    AstNode condition = null;
                    if (vertexAstNode instanceof IfStatement) {
                        IfStatement ifStatement = (IfStatement) vertexAstNode;
                        condition = ifStatement.getCondition();
                        addPUses(getVariableNamesInside(condition), vertex);
                    }
                    else if (vertexAstNode instanceof WhileLoop) {
                        WhileLoop whileLoop = (WhileLoop) vertexAstNode;
                        condition = whileLoop.getCondition();
                    }

                    if (condition != null) {
                        addPUses(getVariableNamesInside(condition), vertex);
                    }
                }
                else if (vertex instanceof StatementVertex) {
                    if (vertexAstNode instanceof VariableDeclaration) {
                        VariableDeclaration variableDeclaration = (VariableDeclaration) vertexAstNode;
                        List<VariableInitializer> variableInitializers = variableDeclaration.getVariables();
                        variableInitializers.forEach(initializer -> {
                            addDefs(getVariableNamesInside(initializer.getTarget()), vertex);
                            addCUses(getVariableNamesInside(initializer.getInitializer()), vertex);
                        });
                    }
                    else if (vertexAstNode instanceof ExpressionStatement) {
                        ExpressionStatement expressionStatement = (ExpressionStatement) vertexAstNode;
                        AstNode expression = expressionStatement.getExpression();
                        if (expression instanceof Assignment) {
                            Assignment assignment = (Assignment) expression;
                            addDefs(getVariableNamesInside(assignment.getLeft()), vertex);
                            addCUses(getVariableNamesInside(assignment.getRight()), vertex);
                        }
                    }
                    else if (vertexAstNode instanceof ReturnStatement) {
                        ReturnStatement returnStatement = (ReturnStatement) vertexAstNode;
                        addCUses(getVariableNamesInside(returnStatement.getReturnValue()), vertex);
                    }
                }
            }
        });
    }

    private void addPUses(Set<String> variableNames, Vertex vertex) {
        variableNames.forEach(name -> vertex.addP_uses(getVariableByName(name)));
    }

    private void addCUses(Set<String> variableNames, Vertex vertex) {
        variableNames.forEach(name -> vertex.addC_uses(getVariableByName(name)));
    }

    private void addDefs(Set<String> variableNames, Vertex vertex) {
        variableNames.forEach(name -> vertex.addDefs(getVariableByName(name)));
    }

    private Variable getVariableByName(String name) {
        Variable variable = variableMap.get(name);
        if (variable == null) {
            variable = new Variable(name);
            variableMap.put(name, variable);
        }
        return variable;
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

    public List<GraphPath> getGraphPaths() {
        return graphPaths;
    }
}
