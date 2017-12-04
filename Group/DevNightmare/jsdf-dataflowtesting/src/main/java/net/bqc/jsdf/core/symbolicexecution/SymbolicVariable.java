package net.bqc.jsdf.core.symbolicexecution;

public class SymbolicVariable {

    private static char VALUE_ASSIGNER = 'a';

    private String value;
    private boolean parameter = false;

    public SymbolicVariable(boolean parameter) {
        this.parameter = parameter;
        this.value = new StringBuilder().append(VALUE_ASSIGNER++).toString();
    }

    public SymbolicVariable(String value) {
        this.value = value;
    }

    public boolean isParameter() {
        return parameter;
    }

    public void setParameter(boolean parameter) {
        this.parameter = parameter;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
