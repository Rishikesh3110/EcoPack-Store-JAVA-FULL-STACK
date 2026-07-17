package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Product;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public List<Product> getAllProducts() {
        return service.getAllProducts();
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return service.getProductById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        service.deleteProduct(id);
        return "Product Deleted Successfully";
    }
}