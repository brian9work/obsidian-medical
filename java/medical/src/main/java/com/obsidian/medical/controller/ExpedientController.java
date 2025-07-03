package com.obsidian.medical.controller;

import com.obsidian.medical.auth.AuthResponse;
import com.obsidian.medical.dto.auth.LoginRequestDTO;
import com.obsidian.medical.dto.auth.LogupRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientRequestDTO;
import com.obsidian.medical.dto.expedient.ExpedientResponseDTO;
import com.obsidian.medical.dto.expedient.UserWithExpedientDTO;
import com.obsidian.medical.model.ExpedientModel;
import com.obsidian.medical.model.UserModel;
import com.obsidian.medical.service.ExpedientService;
import com.obsidian.medical.service.UserService;
import com.obsidian.medical.utils.PaginatedResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

//    implementation 'org.springframework.boot:spring-boot-starter-web'

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/expedient")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExpedientController {
    private final ExpedientService expedientService;

    @CrossOrigin(origins = "*")
    @PostMapping("/save")
    public ResponseEntity save(@RequestBody ExpedientRequestDTO request) {
        return expedientService.save(request);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/image")
    public ResponseEntity uploadImage(@RequestParam("file") MultipartFile file) {
        return expedientService.uploadImage(file);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/getexpedient")
    public ExpedientResponseDTO getExpedient(@RequestBody Map<String, Object> body) {
        String email = (String) body.get("email");
        if (email == null){
            System.out.println("no se recibieron los valores");
            return null;
        }
//        return new ExpedientResponseDTO();
        return expedientService.getExpedient(email);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/getByAdmin")
    public ResponseEntity<List<ExpedientResponseDTO>> getAll(
//    public PaginatedResponse<ExpedientResponseDTO> getAll(
            @RequestBody Map<String, Object> body,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size

    ) {
        System.out.println(page);
        System.out.println(size);
        try {
            Integer.parseInt(page+"");
            Integer.parseInt(size+"");
        } catch (NumberFormatException excepcion) {
            page = 0;
            size = 20;
        }

        if(page<=-1 || size<=0 ){
            page = 0;
            size = 20;
        }

        System.out.println(page);
        System.out.println(size);
        String email = (String) body.get("email");
        return expedientService.getAll(email, page, size);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/{id}")
    public ExpedientResponseDTO getById(@PathVariable("id") Long id) {
        return expedientService.getById(id);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/userwithexpedient")
    public List<UserWithExpedientDTO> findByNotExpedient() {
        return expedientService.findByNotExpedient();
    }


}

//org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'expedientController' defined in file [C:\wamp64\www\obsidian-medical\java\medical\build\classes\java\main\com\obsidian\medical\controller\ExpedientController.class]: Unsatisfied dependency expressed through constructor parameter 0: Error creating bean with name 'expedientService' defined in file [C:\wamp64\www\obsidian-medical\java\medical\build\classes\java\main\com\obsidian\medical\service\ExpedientService.class]: Unsatisfied dependency expressed through constructor parameter 0: Error creating bean with name 'IExpedientRepository' defined in com.obsidian.medical.repository.IExpedientRepository defined in @EnableJpaRepositories declared on JpaRepositoriesRegistrar.EnableJpaRepositoriesConfiguration: Could not create query for public abstract java.util.List com.obsidian.medical.repository.IExpedientRepository.findByNotExpedient(); Reason: Validation failed for query for method public abstract java.util.List com.obsidian.medical.repository.IExpedientRepository.findByNotExpedient()
