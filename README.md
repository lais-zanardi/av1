# AutoBots - API de Gestão de Manutenção Veicular

---

API REST desenvolvida em **Spring Boot** para a gestão de clientes, documentos, endereços e telefones de oficinas e lojas de autopeças. Este projeto é a implementação da atividade prática **AV1** da disciplina **Desenvolvimento Web III**.

---

## 🛠 Tecnologias
* **Java 17** & **Spring Boot 3.2.4**
* **Spring Data JPA** & **H2 Database** (Banco em memória)
* **Lombok** 
* **MapStruct** (Mapeamento DTO/Entidade)
* **Bean Validation** (Validação de dados)

## 🚀 Como Executar
1.  Certifique-se de ter o **JDK 17** instalado.
2.  Execute o wrapper do Maven no terminal:
    ```bash
    ./mvnw spring-boot:run
    ```
3.  Acesse a API em: `http://localhost:8080`
4.  **Console H2:** `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`)

## 📂 Estrutura do Projeto
* `entidades`: Modelos de dados (Cliente, Documento, Endereço, Telefone).
* `dtos`: Objetos para trânsito de dados (Requisição/Resposta).
* `controles`: Endpoints REST.
* `servicos`: Lógica de negócio e persistência.
* `mapeador`: Conversão automática Entidade <-> DTO.

## 📡 Endpoints Principais

### Clientes (`/cliente`)
* `GET /cliente`: Lista todos os clientes.
* `GET /cliente/{id}`: Detalhes de um cliente.
* `POST /cliente`: Cadastra cliente.
* `PATCH /cliente/{id}`: Atualiza dados.
* `DELETE /cliente/{id}`: Remove cliente.

### Outros Recursos
* `PATCH /endereco/{id}`: Atualização de endereço.
* `PATCH /telefone/{id}`: Atualização de telefone.

