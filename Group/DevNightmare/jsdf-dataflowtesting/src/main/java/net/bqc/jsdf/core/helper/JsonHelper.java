package net.bqc.jsdf.core.helper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class JsonHelper {

    private ObjectMapper mapper;
    private static final JsonHelper instance = new JsonHelper();
    public static JsonHelper getInstance() {
        return instance;
    }

    private JsonHelper() {
        mapper = new ObjectMapper();
    }

    public String getJson(Object object) {
        try {
            return mapper.writeValueAsString(object);

        }
        catch (JsonProcessingException e) {
            e.printStackTrace();
            return null;
        }
    }

    public <T> T getObject(String jsonAsStr, Class<T> clazz) {
        try {
            return mapper.readValue(jsonAsStr, clazz);
        }
        catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}
