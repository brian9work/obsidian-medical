package com.obsidian.medical.utils;
import org.springframework.data.domain.Page;

import java.util.List;

public class PaginatedResponse <T>{
    private int totalPages;

    private List<T> content;

    public PaginatedResponse(Page<T> page) {
        this.totalPages = page.getTotalPages();
        this.content = page.getContent();
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }


    public List<T> getContent() {
        return content;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }
}