package net.bqc.jsdf.core.df;

import net.bqc.jsdf.core.helper.JGraphUtils;
import net.bqc.jsdf.core.model.Edge;
import net.bqc.jsdf.core.model.Vertex;
import org.jgrapht.DirectedGraph;
import org.jgrapht.GraphPath;


import java.util.List;

public class DFGenerator {

    private DirectedGraph<Vertex, Edge> cfg;
    List<GraphPath> graphPaths;

    public DFGenerator(DirectedGraph<Vertex, Edge> cfg, List<GraphPath> graphPaths) {
        this.cfg = cfg;
        this.graphPaths = graphPaths;
        JGraphUtils.printPaths(graphPaths);
    }


}
